# Calculus Lab

An interactive p5.js visualizer for Newton's method applied to

```text
f(x) = x² - target
```

The roots are `+√target` and `-√target`. The visualizer shows the function,
the current approximation, the tangent line, and the next x-intercept produced
by Newton's method.

## Running the project

Open `index.html` in a web browser. The page loads p5.js from jsDelivr, so an
internet connection is required unless p5.js is downloaded and served locally.

## Using the visualizer

1. Enter a positive number in **Target number** and select **Set target**.
2. Enter a nonzero starting value in **Starting X** and select **Set starting X**.
3. Select **Calculate next iteration** to advance Newton's method one step at a time.

Positive starting values converge toward the positive square root. Negative
starting values converge toward the negative square root. A starting value of
zero is rejected because the derivative is zero there.

## Newton's method

For this function,

```text
f(x)  = x² - target
f'(x) = 2x
```

Each iteration uses:

```text
x(next) = x - f(x) / f'(x)
```

The visualizer reports convergence when `|f(x)|` is less than `0.000001`.
