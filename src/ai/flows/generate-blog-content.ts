'use server';

/**
 * @fileOverview Blog content generation flow for marketing agency.
 *
 * - generateBlogContent - A function that generates blog content based on keywords.
 * - GenerateBlogContentInput - The input type for the generateBlogContent function.
 * - GenerateBlogContentOutput - The return type for the generateBlogContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogContentInputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'Keywords related to the target audience for generating blog content.'
    ),
});
export type GenerateBlogContentInput = z.infer<typeof GenerateBlogContentInputSchema>;

const GenerateBlogContentOutputSchema = z.object({
  title: z.string().describe('The title of the blog post.'),
  content: z.string().describe('The generated blog content.'),
  shouldIncludeInformation: z
    .boolean()
    .describe(
      'Whether or not the generated blog content should include certain information.'
    ),
});
export type GenerateBlogContentOutput = z.infer<typeof GenerateBlogContentOutputSchema>;

export async function generateBlogContent(
  input: GenerateBlogContentInput
): Promise<GenerateBlogContentOutput> {
  return generateBlogContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogContentPrompt',
  input: {schema: GenerateBlogContentInputSchema},
  output: {schema: GenerateBlogContentOutputSchema},
  prompt: `You are an expert marketing content creator.

You will generate a blog post based on the provided keywords, demonstrating marketing thought leadership.

Keywords: {{{keywords}}}

Consider these keywords when generating the content to appeal to the target audience.

Return a title and blog content. Determine if the generated content should include information based on the context of the keywords.
`,
});

const generateBlogContentFlow = ai.defineFlow(
  {
    name: 'generateBlogContentFlow',
    inputSchema: GenerateBlogContentInputSchema,
    outputSchema: GenerateBlogContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
