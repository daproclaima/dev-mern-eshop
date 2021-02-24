import React from "react";
import { Helmet } from "react-helmet";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Sébastien NOBOUR portfolio e-commerce MERN stack ",
  description:
    "Portfolio e-commerce website made in MERN stack by Sébastien NOBOUR",
  keywords:
    "react, express, mongoDB, Node, react.js, express.js, node.js, javascript, e-commerce, full-stack, NOBOUR Sébastien, full-stack developer, développeur full-stack",
};

export default Meta;
