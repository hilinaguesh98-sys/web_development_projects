# Security and Failure Checks

Run these against the production server after `npm run build && npm start`.

```powershell
curl.exe -i http://localhost:3000/api/dishes
curl.exe -i http://localhost:3000/api/dishes/no-such-dish
curl.exe -i -X POST http://localhost:3000/api/orders -H "Content-Type: application/json" -d "{}"
curl.exe -i -X POST http://localhost:3000/api/orders -H "Content-Type: application/json" -d "{\"name\":\"Test User\",\"phone\":\"0911000000\",\"address\":\"Addis Ababa\",\"items\":[{\"id\":\"item-1\",\"qty\":1}]}"
curl.exe -i http://localhost:3000/api/orders/AE-0000
```

Browser checks:

- Open the app with JavaScript enabled and verify Home, Menu, Favorites, Cart, Orders and confirmation.
- Disable JavaScript and reload static/navigation pages. The App Router HTML and normal links remain reachable; interactive localStorage features require JavaScript by design.
- Put more than 20 units into a direct API order and confirm a 400 response.
- Submit an unknown dish id and confirm a 400 response.
- Refresh an order confirmation page and confirm it still renders while the server process is running.
