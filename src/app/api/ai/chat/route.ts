// Simpler mock response for prototype
const mockResponse = (context: string) => {
  const responses = [
    `Based on the subscriber's current package (South Sports SD), I recommend upgrading to the **HD Mega Pack** as it includes all their favorite channels for just ₹45 more.`,
    `The subscriber has a history of technical issues with the current STB (BoxID: 02939). I've flagged a potential **LNB misalignment** based on the signal drops.`,
    `I see a pending **Watcho** subscription request. You should offer the 'Super Bowl' seasonal discount (Coupon: WATCHO50) to close the sale.`,
    `The caller's sentiment is dropping. I suggest using the **Retention Script #4** and offering a 10% loyalty waiver on their next recharge.`,
    `This VC (02563029393) is eligible for the **Amnesty Program**. You can waive the late fee of ₹150 if they recharge today.`
  ];
  return responses[Math.floor(Math.random() * responses.length)];
};

export async function POST(req: Request) {
  const { messages, customerContext } = await req.json();

  const responseText = mockResponse(JSON.stringify(customerContext));
  
  // Create a custom ReadableStream to simulate token-by-token streaming without 'ai' dependency for debugging
  const stream = new ReadableStream({
    async start(controller) {
      const words = responseText.split(' ');
      for (const word of words) {
        controller.enqueue(new TextEncoder().encode(word + ' '));
        await new Promise((r) => setTimeout(r, 80));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
