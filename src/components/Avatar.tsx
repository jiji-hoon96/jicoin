import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const SAvatar = styled.div`
  text-align: center;
`;

const Img = styled.img`
  max-width: 100%;
  border: none;
  width:40px;
  height:30px;
  border-radius:10px;
`;

function Avatar({ url = "" }) {
  return <SAvatar>{url === "" || url === null ||url=== undefined  ? <FontAwesomeIcon icon={faUserAlt} size="lg" /> : <Img src={url} />}</SAvatar>;
}
export default Avatar;

