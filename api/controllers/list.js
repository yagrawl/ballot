exports.get_list = (req, res) => {
  let list = ["item1", "item2", "item3"];
  res.json(list);
};
