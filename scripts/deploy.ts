import { publish } from 'gh-pages';

publish(
 '.svelte-kit', // path to public directory
 {
  branch: 'release/prod',
  repo: 'https://github.com/danieloakman/family-admin.git', // Update to point to your repository
  user: {
   name: 'Daniel Oakman', // update to use your name
   email: '42539848+danieloakman@users.noreply.github.com' // Update to use your email
  },
  dotfiles: true
  },
  () => {
   console.log('Deploy Complete!');
  }
);