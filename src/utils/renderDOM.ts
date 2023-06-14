import BaseComponent from './block/block'

export function render (query:string, block:BaseComponent):HTMLElement | void {
  const root:HTMLElement | null = document.querySelector(query)

  if (!root) { return }

  root.innerHTML = ''
  root.appendChild(block.getContent())
  block.dispatchComponentDidMount()

  return root
}
