"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateFormData(formData, EDITMODE, ticket) {
    console.log("EDITMODE:", EDITMODE);
    console.log("Ticket ID:", ticket._id); // Log ticket._id to ensure it's valid

    let res;
    if (EDITMODE) {
        res = await fetch(`${process.env.URL}/api/Tickets/${ticket._id}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });
    } else {
        res = await fetch(process.env.URL + "/api/Tickets", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    if (!res.ok) {
        throw new Error(`Failed to ${EDITMODE ? "update" : "create"} ticket`);
    }

    // Revalidate and redirect
    revalidatePath("/");
    redirect("/");
}
