import FlexContainer from "../FlexContainer";

const NotFound = () => {
    return (
      <FlexContainer alignItems="center" center column>
        <h1 style={{color:"white"}}>Sorry, requested resource was not found.</h1>
      </FlexContainer>  
    )
}

export default NotFound;