export default function CountryHistory({ history, manualSubmitForm }: any) {
  return (
    <div>
      {history && (
        <>
          <b className="font-serif mr-3">history</b>
          <input type="hidden" name="country" />

          {history.map((associate: any, index: number) => (
            <button
              title={associate.name}
              className="text-4xl ml-2 hover:text-5xl"
              key={index}
              onClick={() =>
                manualSubmitForm({
                  country: associate.name,
                })
              }
            >
              {associate.flag.unicode}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
