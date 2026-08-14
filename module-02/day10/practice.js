// 1. Fetch USD → ETB exchange rate
async function getUsdToEtbRate() {
  const res = await fetch(
    "https://open.er-api.com/v6/latest/USD"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch exchange rate");
  }

  const data = await res.json();

  return data.rates.ETB;
}

getUsdToEtbRate()
  .then(rate => {
    console.log("1 USD =", rate, "ETB");
  })
  .catch(error => {
    console.log("Error:", error.message);
  });


// 2. Fetch → JSON → render using async/await
async function loadUsers() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!res.ok) {
      throw new Error("Request failed");
    }

    const data = await res.json();

    console.log("Users:", data);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

loadUsers();


// 3. Wrong URL + HTTP 404
async function testErrors() {
  try {
    const wrongUrl = await fetch(
      "https://jsonplaceholder.typicode.com/wrong-url"
    );

    if (!wrongUrl.ok) {
      throw new Error(`HTTP error: ${wrongUrl.status}`);
    }
  } catch (error) {
    console.log("Wrong URL:", error.message);
  }

  try {
    const notFound = await fetch(
      "https://jsonplaceholder.typicode.com/posts/999999"
    );

    if (!notFound.ok) {
      throw new Error(`HTTP error: ${notFound.status}`);
    }

    console.log(await notFound.json());
  } catch (error) {
    console.log("404 test:", error.message);
  }
}

testErrors();


// 4. Promise.all
async function loadPosts() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );

    if (!res.ok) {
      throw new Error("Failed to load posts");
    }

    const posts = await res.json();

    const firstTwo = posts.slice(0, 2);

    const details = await Promise.all(
      firstTwo.map(post =>
        fetch(
          `https://jsonplaceholder.typicode.com/users/${post.userId}`
        ).then(res => res.json())
      )
    );

    console.log("First two user details:", details);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

loadPosts();