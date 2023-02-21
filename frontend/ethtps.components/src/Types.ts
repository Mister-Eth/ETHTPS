import React from 'react'
import { SkeletonWithTooltip } from './components/partials/skeletons/SkeletonWithTooltip'

export const ConditionalRender = (
	component: JSX.Element,
	renderIf?: boolean
) => {
	return renderIf
		? component
		: React.createElement('div', {
				className: 'placeholder',
		  })
}

export const ConditionalSkeletonRender = (
	component?: JSX.Element,
	renderIf?: boolean
) => {
	return renderIf ? component : React.createElement(SkeletonWithTooltip)
}
interface IconTypeProps {
	width: number
	height: number
	color: string
}

export type IconType = (props: IconTypeProps) => JSX.Element

export type DropdownOptionWithIcon<T> =
	| {
			value: T
			icon?: IconType
	  }
	| undefined

export function createDropdownOptionWithIcon<T>(
	value: T,
	icon?: IconType
): DropdownOptionWithIcon<T> {
	return {
		value,
		icon,
	}
}
