"use server";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";

import { auth, signIn, signOut } from "./auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { NewBooking } from "@/app/_types/domain";


// UPDATE GUEST
export async function updateGuest(formData: FormData) {
  const session = await auth();
  if (!session?.user.guestId) throw new Error("You must be logged in");

  const nationalID = String(formData.get("nationalID") ?? "");
  const [nationality, countryFlag] = String(
    formData.get("nationality") ?? ""
  ).split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");
}


// CREATE BOOKING
export async function createBooking(
  bookingData: NewBooking,
  formData: FormData
) {
  const session = await auth();
  if (!session?.user.guestId) throw new Error("You must be logged in");
  if (!bookingData.startDate || !bookingData.endDate)
    throw new Error("Please select your travel dates");

  const newBooking = {
    ...bookingData,
    startDate: bookingData.startDate.toISOString(),
    endDate: bookingData.endDate.toISOString(),
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations: String(formData.get("observations") ?? "").slice(0, 1000),
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  redirect("/cabins/thankyou");
}


// DELETE BOOKING
export async function deleteBooking(bookingId: number) {
  const session = await auth();
  if (!session?.user.guestId) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}


// UPDATE BOOKING
export async function updateBooking(formData: FormData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session?.user.guestId) throw new Error("You must be logged in");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: String(formData.get("observations") ?? "").slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error("Booking could not be updated");

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}