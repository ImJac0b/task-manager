// app/api/initialTasks/route.js
import { NextResponse } from 'next/server';
import { getInitialTasks } from '../../utils/getInitialTasks'; // Ruta relativa

export async function GET() {
  try {
    const tasks = await getInitialTasks(); 
    return NextResponse.json(tasks); 
  } catch (error) {
    console.error('Error al obtener las tareas iniciales:', error);
    return NextResponse.error(); 
  }
}
