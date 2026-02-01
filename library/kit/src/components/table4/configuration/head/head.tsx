import React from 'react';

export interface IProps {
  label?: string;
}

interface IHeadPropsWithDisplayName extends React.FC<IProps> {
  displayName: string;
}

export const Head: IHeadPropsWithDisplayName = () => null;
Head.displayName = 'Head';
