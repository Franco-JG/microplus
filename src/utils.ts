import { ArticleInfo } from "./interfaces"

export function generateArticle({ title, description }: ArticleInfo) {
  const section = document.querySelector('section')
	
  const article = document.createElement('article')
  const canvas = document.createElement('canvas')

  const titleElement = document.createElement('h2')
  const descriptionElement = document.createElement('p') 

  titleElement.innerHTML = title;
  descriptionElement.innerHTML = description;

  article.appendChild(titleElement)
  article.appendChild(canvas)
  article.appendChild(descriptionElement)
  section?.appendChild(article)

  return canvas;
}
