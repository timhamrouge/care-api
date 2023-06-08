import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100%;
  background: #00264d;
  @media (max-width: 800px) {
    justify-content: center;
  }
`;

const Image = styled.img`
  margin: 16px 16px;
  @media (max-width: 800px) {
    margin: 8px 8px;
  }
`

const Header = () => {
  return (
    <Container>
      <a href="/">
        <Image src="https://assets-global.website-files.com/5d80c03f1edd7bd68fcdb623/633ead0f172e7255f4ce0395_logo-white.svg" alt="birdie-logo"/>
      </a>
    </Container>
  );
};

export default Header;
