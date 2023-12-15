import React from 'react';
import {getPostRequest} from '../api/modules/post.request';

export const useGetPostById = id => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const call = async () => {
    try {
      setIsLoading(true);
      const {data} = await getPostRequest({id});
      return data;
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    error,
    call,
  };
};
