// Loaded in <head> without defer, so the saved theme is set before the page draws.
(function () {
    var root = document.documentElement;
    root.classList.add('js');
    try { if (localStorage.theme) root.dataset.theme = localStorage.theme; } catch (e) {}

    document.addEventListener('click', function (e) {
        if (e.target.closest('.nav__theme')) {
            var system = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            var next = (root.dataset.theme || system) === 'dark' ? 'light' : 'dark';
            if (next === system) delete root.dataset.theme; else root.dataset.theme = next;
            try { if (next === system) localStorage.removeItem('theme'); else localStorage.theme = next; } catch (e) {}
        }
        var copy = e.target.closest('.cmd__copy');
        if (copy) {
            var text = copy.closest('.cmd').querySelector('code').textContent;
            navigator.clipboard.writeText(text).then(function () {
                copy.classList.add('is-done');
                setTimeout(function () { copy.classList.remove('is-done'); }, 1400);
            });
        }
    });
})();
