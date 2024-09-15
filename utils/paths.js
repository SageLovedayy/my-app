function getNestedValue(obj, path, defaultValue = "not_set") {
  return path.reduce((acc, key) => acc?.[key], obj) || defaultValue;
}
