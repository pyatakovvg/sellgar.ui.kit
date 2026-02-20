import React from 'react';

export interface IEmptyProps {}

interface IEmptyPropsWithDisplayName extends React.FC<React.PropsWithChildren<IEmptyProps>> {
  displayName: string;
}

export const Empty: IEmptyPropsWithDisplayName = (props) => props.children;
Empty.displayName = 'Empty';
