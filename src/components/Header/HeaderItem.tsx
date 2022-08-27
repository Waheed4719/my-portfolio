import React from 'react'

type Props = { title: string }

const HeaderItem = ({ title }: Props) => (<li className="text-white  cursor-pointer hover:text-red">{title}</li>)

export default HeaderItem
