// functions/api/chatbot.js
export async function onRequest(context) {
  const { request, env } = context;

  // Solo permitir POST
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const { nombres, apellidos, email, telefono } = body;

    // Validar campos requeridos
    if (!nombres || !apellidos || !email || !telefono) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Todos los campos son requeridos'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validar email básico
    if (!email.includes('@') || !email.includes('.')) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Correo electrónico inválido'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Guardar en D1
    const db = env.DB; // El binding debe llamarse "DB"

    const { success } = await db.prepare(
      `INSERT INTO registros (nombres, apellidos, email, telefono, created_at)
       VALUES (?, ?, ?, ?, datetime('now'))`
    ).bind(nombres, apellidos, email, telefono).run();

    if (!success) {
      throw new Error('Error al insertar en la base de datos');
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Datos guardados correctamente'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error en /api/chatbot:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'Error interno del servidor'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}