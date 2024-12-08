export const Logo: React.FC<{ logoStyle?: string }> = ({ logoStyle }) => {
  return (
    <div className={`font-semibold logoFont ${logoStyle}`}>
      <a href="/">SyncPAD</a>
    </div>
  );
};
