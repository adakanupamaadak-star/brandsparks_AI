export async function POST(request) {
  try {
    const {
      brandName,
      industry,
      audience,
      tone,
      contentType,
      topic,
      keywords,
      requirements,
    } = await request.json();

    // Mock response - Replace with real OpenAI API call
    const mockContent = `${contentType} for ${brandName}

Tone: ${tone}
Industry: ${industry}
Target Audience: ${audience}

---

Your AI-generated ${contentType} content:

Push beyond limits and unlock your strongest version every day. Designed for ${audience} who never stop moving, our performance gear helps you stay comfortable, focused, and confident.

With cutting-edge technology and premium materials, ${brandName} delivers excellence in every aspect. Experience the difference quality makes.

Keywords: ${keywords}

Requirements met: ${requirements}`;

    return Response.json({
      content: mockContent,
      success: true,
    });
  } catch (error) {
    return Response.json(
      { error: 'Failed to generate content', success: false },
      { status: 500 }
    );
  }
}
