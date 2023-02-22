import React from 'react'
import { IHandler } from '../IHandler'

export function useHandler<TReturnValue>(
	handler?: IHandler<TReturnValue>
): Handler<TReturnValue> | undefined {
	if (!handler) return undefined

	return React.useCallback(
		() => createHandlerFromType<TReturnValue>(handler),
		[handler]
	)()
}

function createHandlerFromType<TReturnValue>(
	handler?: IHandler<TReturnValue>
): Handler<TReturnValue> {
	return createHandler<IHandler<TReturnValue>, TReturnValue>(handler)
}
function createHandler<THandler extends IHandler<TReturnValue>, TReturnValue>(
	handler?: THandler
): Handler<TReturnValue> {
	if (!handler)
		return { setter: (newValue?: TReturnValue) => {}, value: undefined }

	const [value, setValue] = React.useState<TReturnValue | undefined>(
		handler.defaultValue
	)
	const setter = (newValue?: TReturnValue) => {
		setValue(newValue)
		handler.callback?.(newValue as TReturnValue)
	}
	return { setter, value }
}

export type Handler<TReturnValue> = {
	setter: (newValue?: TReturnValue) => void
	value?: TReturnValue | undefined
}
