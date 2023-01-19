import '../../..//App.css';
import React, { } from "react";
import 'query-string';
import { MainPageModel } from './MainPageModel';
import LoadingPage from '../loading/LoadingPage';
import { useQueryClient } from "react-query"

export default function MainPage(): JSX.Element {
  const data = useQueryClient();
  return (
    <> <p>{JSON.stringify(data)}</p>
      <LoadingPage />
    </>
  );
}
