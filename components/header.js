import styled from "styled-components";
import Link from "next/link";

const HeaderWrapper = styled.div`
  background: #c75d00;
  margin-bottom: 1.45rem;
  overflow: hidden;
  position: relative;
  height: 180px;
  text-align: right;
`;

const HeaderContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding: 1.45rem 1.0875rem;
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  color: #fffee5;
`;

const Nav = styled.nav`
  ul {
    margin: 0px;
    list-style: none;
    @media (min-width: 649px) {
      display: flex;
      flex-wrap: wrap;
    }
    li {
      margin-left: 30px;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans - serif;
      font-size: 2rem;
      text-align: right;
      list-style-position: inside;
      * {
        text-decoration: none;
        color: #fffee5;
        &:hover {
          color: #ddd;
          cursor: pointer;
        }
      }
    }
  }
`;

const Header = () => (
  <HeaderWrapper>
    <HeaderContainer>
      <h2 style={{ margin: 0 }}>
        <Link href="/">
          <a style={{ color: "white", textDecoration: "none" }}>Home</a>
        </Link>
      </h2>
      <Nav>
        <ul>
          <li>
            <Link href="/posts">
              <a>Posts</a>
            </Link>
          </li>
          <li>
            <Link href="/music">
              <a>📻</a>
            </Link>
          </li>
        </ul>
      </Nav>
    </HeaderContainer>
  </HeaderWrapper>
);

export default Header;
