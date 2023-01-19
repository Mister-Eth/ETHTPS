import '../../..//App.css';
import React, { } from "react";
import 'query-string';
import { MainPageModel } from './MainPageModel';
import LoadingPage from '../loading/LoadingPage';

export default function MainPage(): JSX.Element {

  return (
    <>
      <LoadingPage />
    </>
  );
}
