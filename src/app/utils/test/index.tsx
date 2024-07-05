import React from 'react';
import {
  queries,
  Queries,
  render,
  renderHook,
  RenderHookOptions,
  RenderHookResult,
  RenderOptions,
} from '@testing-library/react';
import { Providers } from '../providers';
import { matchMediaMock } from './mocks';

const customRender = (ui: React.ReactElement, options?: RenderOptions) => {
  matchMediaMock();
  return render(ui, {
    wrapper: ({ children }) => <Providers>{children}</Providers>,
    ...options,
  });
};

const customRenderHook = <
  Result,
  Props,
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  render: (initialProps: Props) => Result,
  options?: RenderHookOptions<Props, Q, Container, BaseElement>,
): RenderHookResult<Result, Props> => {
  matchMediaMock();
  return renderHook(render, {
    wrapper: ({ children }) => <Providers>{children}</Providers>,
    ...options,
  });
};

export * from '@testing-library/react';

export { customRender as render };
export { customRenderHook as renderHook };
