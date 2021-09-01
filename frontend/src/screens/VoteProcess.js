let body = {
    _id: x,
    candidate: {
      id: candidato
    },
    username: user.username
  };

  const voteFunc = () => {
    api.post('/votings/my', { username: user.username }, header)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }