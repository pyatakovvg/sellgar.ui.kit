import React from 'react';

export interface IExpandProps {}

interface IExpandPropsWithDisplayName extends React.FC<React.PropsWithChildren<IExpandProps>> {
  displayName: string;
}

export const Expand: IExpandPropsWithDisplayName = (props) => props.children;
Expand.displayName = 'Expand';
