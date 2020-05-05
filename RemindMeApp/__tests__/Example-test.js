import { getCreateMemo } from "../source/actions/app";

it('Reducer video_library with gallery data', () => {
  const galleries = [];
  const memo = Object.assign({},galleries[0],{
    galleries
  });
  expect(video_library(data, getCreateMemo(memo))).toMatchSnapshot();
});
