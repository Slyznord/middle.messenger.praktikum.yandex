type Indexed<T = unknown> = {
  [key in string]: T
}

type BasicTypes = {
  [key in string]: string | number | object | [] | undefined | null | Indexed
}

type route = {
  path:string,
  component:Indexed<unknown>
}

type Chats = {
  id: number,
  title: string,
  avatar: string,
  unread_count: number,
  last_message: {
    user: {
      first_name: string,
      second_name: string,
      avatar: string,
      email: string,
      login: string,
      phone: string
    },
    time: string,
    content: string
  }
}

type User = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string
}

type State = {
  chats: Chats | null,
  user: User | null
}

export {
  BasicTypes,
  route,
  Indexed,
  State
}
