import styledComponents from "styled-components";

export const MainColor = '#003097'
export const SecondaryColor = '#333'

export const ButtonBox = styledComponents.div`
  display: flex;
  justify-content: flex-end;
`

export const Button = styledComponents.button`
  color: #ffffff;
  background-color: ${MainColor};
  padding: 5px 20px;
  margin: 5px 0;
  border: none;
  font-size: 15px;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &+a, &+& {
    margin-left: 5px;
  }
`

export const MainSection = styledComponents.article`
  h1 {
    font-size: 1.33em;
    margin-bottom: 20px;
  }

  h2 {
    font-weight: bold;
    font-size: 1.1em;
    color: ${MainColor};
    margin-bottom: 5px;
  }

  p, dt {
    margin-bottom: 20px;
    white-space: pre-line;
  }

  form {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;

    label {
      text-align: left;
      display: block;
    }

    input, textarea, select {
      width: 100%;
      padding: 6px 10px;
      margin:  10px 0;
      border: 1px solid ${SecondaryColor};
      box-sizing: border-box;
      display: block;
    }

    .span-content {
      border: 3px dashed #333;
      min-height: 20px;
      padding: 7px;

      span {
        background-color: ${MainColor};
        color: white;
        padding: 5px 10px;
        border-radius: 20px;
        margin: 5px;
        display: inline-block;
      }

      i {
        color: white;
        padding-left: 10px;

        &:hover {
          font-weight: bold;
          cursor: pointer;
        }
      }
    }
  }
`

export const ListSection = styledComponents.section`
  div {
    padding: 10px 16px;
    margin:20px 0;
    border-bottom: 1px solid #fafafa;
  }

  div:hover {
    box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
  }

  h2 {
    font-size: 20px;
    color: ${MainColor};
    margin-bottom: 8px;
  }

  a {
    text-decoration: none;
  }

  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`