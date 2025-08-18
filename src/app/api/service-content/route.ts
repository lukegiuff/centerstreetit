import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'content', 'pages', `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Convert markdown to HTML
    const htmlContent = marked(content);

    return NextResponse.json({
      frontmatter: data,
      content: htmlContent
    });
  } catch (error) {
    console.error('Error reading service content:', error);
    return NextResponse.json({ error: 'Failed to load content' }, { status: 500 });
  }
}
