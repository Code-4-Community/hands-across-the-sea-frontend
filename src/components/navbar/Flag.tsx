import React, { useEffect, useState } from 'react';
import { default as ProtectedApiClient } from '../../api/protectedApiClient';
import { GetUserResponse } from '../../containers/settings/ducks/types';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import { getUserID } from '../../auth/ducks/selectors';
import { NO_USER_ID } from '../../auth/ducks/types';

function getFlagImage(country?: string): string {
  let src = '';
  switch (country) {
    case 'UNITED_STATES':
      src =
        'https://c4c-hands-across-the-sea.s3.us-east-2.amazonaws.com/united_states_flag.jpg';
      break;
    case 'ANTIGUA_AND_BARBUDA':
      src =
        'https://c4c-hands-across-the-sea.s3.us-east-2.amazonaws.com/antigua_and_barbuda_flag.jpg';
      break;
    case 'DOMINICA':
      src =
        'https://c4c-hands-across-the-sea.s3.us-east-2.amazonaws.com/dominica_flag.jpg';
      break;
    case 'GRENADA':
      src =
        'https://c4c-hands-across-the-sea.s3.us-east-2.amazonaws.com/grenada_flag.jpg';
      break;
    case 'ST_KITTS_AND_NEVIS':
      src =
        'https://c4c-hands-across-the-sea.s3.us-east-2.amazonaws.com/saint__kitts_nevis_flag.jpg';
      break;
    case 'ST_LUCIA':
      src =
        'https://c4c-hands-across-the-sea.s3.us-east-2.amazonaws.com/saint_lucia_flag.jpg';
      break;
    case 'ST_VINCENT_AND_THE_GRENADINES':
      src =
        'https://c4c-hands-across-the-sea.s3.us-east-2.amazonaws.com/saint_vincent_grenadines_flag.jpg';
      break;
  }
  return src;
}

const Flag: React.FC = () => {
  const [country, setCountry] = useState<string | undefined>();
  const userId = useSelector((state: C4CState) => {
    return getUserID(state.authenticationState.tokens);
  });
  useEffect(() => {
    ProtectedApiClient.getUser()
      .then((userInfo) => setCountry(userInfo.country))
      .catch((err) => err);
  }, [userId]);
  const flagImage = getFlagImage(country);
  return userId !== NO_USER_ID && country && flagImage ? (
    <img src={flagImage} alt={country + ' FLAG'} />
  ) : (
    <></>
  );
};
export default Flag;
