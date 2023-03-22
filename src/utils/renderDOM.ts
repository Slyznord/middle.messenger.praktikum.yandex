export function render (query:string, block):HTMLElement | void {
  const root:HTMLElement | null = document.querySelector(query)

  if (!root) { return }

  root.innerHTML = ''
  root.appendChild(block.getContent())
  block.dispatchComponentDidMount()

  return root
}