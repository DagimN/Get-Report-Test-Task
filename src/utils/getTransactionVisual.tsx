import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBagShopping,
  faBolt,
  faCartShopping,
  faHouse,
  faMoneyBillTransfer,
  faReceipt,
  faUtensils,
} from '@fortawesome/free-solid-svg-icons'

const darkColors = ['#1f2937', '#312e81', '#0f766e', '#3f3f46', '#7c2d12', '#1e3a8a']

const iconMap: Record<string, IconDefinition> = {
  ikea: faHouse,
  grocery: faCartShopping,
  coffee: faUtensils,
  restaurant: faUtensils,
  electricity: faBolt,
  utility: faBolt,
  transfer: faMoneyBillTransfer,
  travel: faBagShopping,
  shopping: faBagShopping,
  payment: faMoneyBillTransfer,
}

const hashText = (value: string): number =>
  value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)

export const getTransactionVisual = (
  name: string,
): { icon: IconDefinition; bgColor: string } => {
  const normalizedName = name.toLowerCase()
  const mappedIcon = Object.entries(iconMap).find(([key]) =>
    normalizedName.includes(key),
  )?.[1]
  const icon = mappedIcon ?? faReceipt
  const randomLikeIndex = hashText(name) % darkColors.length
  const bgColor = darkColors[randomLikeIndex]

  return { icon, bgColor }
}
