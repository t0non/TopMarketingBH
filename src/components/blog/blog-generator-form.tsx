'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// import {
//   generateBlogContent,
//   GenerateBlogContentOutput,
// } from '@/ai/flows/generate-blog-content';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';

const formSchema = z.object({
  keywords: z
    .string()
    .min(3, { message: 'Por favor, insira pelo menos 3 caracteres.' }),
});

export default function BlogGeneratorForm() {
  // const [generatedContent, setGeneratedContent] =
  //   useState<GenerateBlogContentOutput | null>(null);
  const [generatedContent, setGeneratedContent] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedContent(null);
    try {
      // Simulação para versão estática
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Funcionalidade indisponível',
        description: 'A geração de conteúdo com IA requer um servidor Node.js (Plano Business ou VPS). No modo estático (Premium), esta função está desativada.',
      });
      // const result = await generateBlogContent(values);
      // setGeneratedContent(result);
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao gerar conteúdo',
        description:
          'Ocorreu um problema ao se comunicar com a IA. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="keywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Palavras-chave</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: marketing digital para pequenas empresas"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Gerar Conteúdo
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">
            Aguarde, nossa IA está criando algo incrível...
          </p>
        </div>
      )}

      {generatedContent && (
        <Card className="mt-8 animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">
              {generatedContent.title}
            </CardTitle>
            {generatedContent.shouldIncludeInformation && (
              <div className="pt-2">
                <Badge variant="secondary">
                  Informações adicionais incluídas
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div
              className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: generatedContent.content.replace(/\n/g, '<br />') }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
