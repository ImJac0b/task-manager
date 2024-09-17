import { NextResponse } from "next/server";
import { getInitialTasks } from "../../utils/getInitialTasks";

export async function GET() {
  try {
    const tasks = await getInitialTasks();
    if (!Array.isArray(tasks)) {
      throw new Error("Invalid data format");
    }

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error al obtener las tareas iniciales:", error);
    return NextResponse.json(
      { error: "Error al obtener las tareas" },
      { status: 500 }
    );
  }
}
