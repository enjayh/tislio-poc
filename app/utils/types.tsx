export type NewAccount = {
  email: string
}

export type NewTag = {
  name: string,
}

export type Tag = {
  id: number,
  name: string
}

export type SelectableTag = {
  id: number,
  name: string,
  selected: boolean
}

export type NewTrait = {
  name: string,
  type: string,
}

export type Trait = {
  id: number,
  name: string,
  type: string
}

export type SelectableTrait = {
  id: number,
  name: string,
  type: string,
  value: string,
  selected: boolean
}

export type NewNote = {
  body: string,
  completed: boolean,
  tags: SelectableTag[],
  traits: SelectableTrait[]
}

export type Note = {
  id: number;
  body: string;
  completed: boolean;
  account_id: number;
  created_at: Date;
  updated_at: Date;
  tags: Tag[]
}

export type UpdateNote = {
  id: number;
  body: string;
  completed: boolean;
  tags: SelectableTag[]
}