import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  console.log('Received PATCH request:', request); // Debugging log

  try {
    const data = await request.json();

    // Mocking a response
    const mockResponse = {
      id: 'mocked-uuid-1234',
      ...data,
    };

    console.log('Mock PATCH Response:', mockResponse); // Debugging log

    return NextResponse.json(mockResponse, { status: data.id ? 200 : 201 }); // 201 for created, 200 for updated
  } catch (error) {
    console.error('Error in PATCH route:', error); // Error log

    return NextResponse.json('Error processing PATCH request', { status: 500 });
  }
}
