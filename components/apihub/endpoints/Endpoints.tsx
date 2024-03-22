"use client";

const Endpoints = ({ endpoints }: any) => {
  return <div style={{ border: "3px solid red", height: "1000px" }}>Endpoints {JSON.stringify(endpoints)}</div>;
};

export default Endpoints;

// const mapStateToProps = (state: RootState) => ({
//   deviceWidth: state.layout.width,
//   displayHeader: state.layout.displayHeader,
// }),
// mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(EndpointsContainer);
