import { revalidatePath } from "next/cache";
import Ticket from "../../(models)/Ticket";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const ticketData = body.formData;

        await Ticket.create(ticketData);
        
        revalidatePath('/');
        return NextResponse.json({ message: "Ticket Created" }, { status: 201 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}

export async function GET() {
    try {
        const tickets = await Ticket.find();
        return NextResponse.json({ tickets }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error", err }, { status: 500 });
    }
}
