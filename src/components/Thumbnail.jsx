function Thumbnail({ src }) {
  return (
    <div
      className="thumbnail"
      style={{
        backgroundImage: `url("${src}")`,
      }}
    />
  );
}

export default Thumbnail;
