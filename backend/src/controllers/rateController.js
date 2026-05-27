function badRequest(message) {
  const error = new Error(message);
  error.status = 400;
  return error;
}

async function getExchangeRate(req, res, next) {
  try {
    const from = String(req.query.from ?? "")
      .trim()
      .toUpperCase();
    const to = String(req.query.to ?? "")
      .trim()
      .toUpperCase();

    if (from.length !== 3 || to.length !== 3) {
      throw badRequest(
        "from and to query parameters must be 3-letter currency codes",
      );
    }

    if (from === to) {
      res.json({
        from,
        to,
        rate: 1,
        amount: 1,
        date: new Date().toISOString(),
      });
      return;
    }

    const response = await fetch(
      `https://api.frankfurter.app/latest?from=${from}&to=${to}`,
    );
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rate");
    }

    const data = await response.json();
    const rate = data?.rates?.[to];

    if (typeof rate !== "number") {
      throw new Error("Exchange rate payload was invalid");
    }

    res.json({
      from,
      to,
      rate,
      date: data.date,
      amount: 1,
      source: "frankfurter.app",
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getExchangeRate,
};
