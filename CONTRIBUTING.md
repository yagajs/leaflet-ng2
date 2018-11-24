# How to contribute

I'm really glad you're reading this, because we need volunteer developers to help this project come to fruition.

If you haven't already, come find us in IRC ([#opengovernment](irc://chat.freenode.net/opengovernment) on freenode). We want you working on things you're excited about.

Here are some important resources:

  * [YAGA Website](https://yagajs.org) tells you something about us,
  * [YAGA leaflet-ng2 module website](https://yagajs.org) gives you all information about the module including examples
  coverage and browser-tests
  * [Issues](https://github.com/yagajs/leaflet-ng2/issues) to get a list of known issues or to add one.

## Testing

We serve a high test-coverage and unit test most of our code. You must test your contribution against the existing tests
and you should write additional test, when you have a new feature or found a bug.

## Submitting changes

Please send a [GitHub Pull Request to opengovernment](https://github.com/yagajs/leaflet-ng2/pull/new/develop) with a
clear list of what you've done (read more about [pull requests](http://help.github.com/pull-requests/)). When you send a
pull request, we will love you forever if you include tests and examples. We can always use more test coverage.
Please follow our coding conventions (below) and make sure all of your commits are atomic.

Always write a clear log message for your commits. One-line messages are fine for small changes, but bigger changes
should look like this:

    $ git commit -m "A brief summary of the commit
    >
    > A paragraph describing what changed and its impact."

Consider opening an issue before making a big change, to prevent developing things twice. In addition you can involve
our team in an early stage, so we are able to guide you.

## Coding conventions

Start reading our code and you'll get the hang of it. The main acceptance criteria is fulfilling our linting rules.

Thanks,
The YAGA Development Team
