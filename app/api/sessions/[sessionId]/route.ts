import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
  console.log('Received DELETE request:', request); // Debugging log

  try {
    const { id } = await request.json();

    console.log('Mock DELETE Request for ID:', id); // Debugging log

    // Mocking a delete response
    const mockResponse = {
      message: `Session with id ${id} deleted successfully`,
    };

    console.log('Mock DELETE Response:', mockResponse); // Debugging log

    return NextResponse.json(mockResponse, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE route:', error); // Error log

    return NextResponse.json('Error processing DELETE request', {
      status: 500,
    });
  }
}
