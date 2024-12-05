export function useAvatar() {
  const getAvatarUrl = (avatarPath: string | null | undefined) => {
    if (!avatarPath) {
      return '/site_images/default_avatar.png'
    }
    return avatarPath
  }

  return {
    getAvatarUrl
  }
}
