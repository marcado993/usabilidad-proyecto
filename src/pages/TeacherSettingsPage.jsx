/**
 * TeacherSettingsPage — Page layer
 * Profile, notification preferences, and account controls for the Teacher role.
 * Mirrors SettingsPage's structure but without student-only widgets (badges, leaderboard, CEFR goal).
 */
import { useState } from 'react'
import { Button, Toggle, Avatar, Icon } from '../atoms'
import { FormField } from '../molecules'
import { AppLayout } from '../templates'

const TEACHER_NAV = [
  { key:'home',       screen:'teacher-home',     icon:<Icon name="home" size="sm" />, label:'Home'       },
  { key:'statistics', screen:'teacher-stats',    icon:<Icon name="chart" size="sm" />, label:'Statistics' },
  { key:'settings',   screen:'teacher-settings', icon:<Icon name="settings" size="sm" />, label:'Settings' },
  { key:'help',       screen:'teacher-help',     icon:<Icon name="help" size="sm" />, label:'Help'        },
]

export default function TeacherSettingsPage({ user, onUpdateSettings, onUpdateProfile, onDeleteAccount, nav }) {
  const s = user?.settings || {}
  const [editMode,   setEditMode]  = useState(false)
  const [editName,   setEditName]  = useState(user?.name || '')
  const [deleteConf, setDeleteConf] = useState(false)
  const [saveMsg,    setSaveMsg]   = useState('')

  const saveProfile = () => {
    onUpdateProfile({ name: editName })
    setEditMode(false)
    setSaveMsg('Profile updated successfully')
    setTimeout(() => setSaveMsg(''), 3000)
  }

  return (
    <AppLayout user={user} nav={nav} activeNav="settings" navItems={TEACHER_NAV} title="Settings">
      <div className="dojo-layout">
        {saveMsg && (
          <div className="alert alert-success" role="status" aria-live="polite" style={{ gridColumn: '1 / -1', display: 'flex', gap: 10, alignItems: 'center', marginBottom: 12 }}>
            <Icon name="check" size="sm" style={{ flexShrink: 0 }} /><span>{saveMsg}</span>
          </div>
        )}

        <div className="dojo-layout__main">
          {/* Profile */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <Icon name="user" size="sm" /> Profile
              </h2>
              <Button variant="secondary" size="sm"
                onClick={() => { setEditMode(m => !m); setEditName(user?.name || '') }}
                ariaLabel={editMode ? 'Cancel edit' : 'Edit profile'}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                {editMode ? <><Icon name="close" size="xs" /> Cancel</> : <><Icon name="pencil" size="xs" /> Edit</>}
              </Button>
            </div>
            <div className="flex items-center gap-5">
              <Avatar initials={user?.initials || ''} size="xl" role="teacher" ariaLabel={`Avatar of ${user?.name || 'Teacher'}`} />
              <div style={{ flex:1 }}>
                {editMode ? (
                  <div className="flex flex-col gap-3">
                    <FormField
                      id="teacher-settings-name" label="Name" value={editName}
                      onChange={setEditName} placeholder="Your full name"
                    />
                    <Button variant="primary" size="sm" onClick={saveProfile} ariaLabel="Save profile changes" disabled={!editName.trim()} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Icon name="check" size="xs" /> Save
                    </Button>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize:'var(--fs-lg)', fontWeight:'var(--fw-bold)' }}>{user?.name}</div>
                    <div style={{ color:'var(--txt-muted)', fontSize:'var(--fs-sm)', marginTop:2 }}>{user?.email}</div>
                    <div style={{ color:'var(--txt-secondary)', fontSize:'var(--fs-sm)', marginTop:4, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Icon name="teacher" size="sm" /> Teacher account
                    </div>
                  </>
                )}
              </div>
            </div>
            {!editMode && (
              <Button variant="secondary" size="sm" style={{ marginTop:16, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                onClick={() => alert('📧 We will send a link to your email to change your password.')}
                ariaLabel="Change password — you will receive an email"
              >
                <Icon name="lock" size="xs" /> Change password
              </Button>
            )}
          </div>

          {/* Notifications */}
          <div className="card">
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', marginBottom:16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="bell" size="sm" /> Notifications
            </h2>
            <div className="flex flex-col gap-4">
              <Toggle id="teacher-notif-submission" checked={!!s.notifSubmission}
                onChange={v => onUpdateSettings({ notifSubmission: v })} label="Notify me when a student submits homework" />
              <Toggle id="teacher-notif-help" checked={!!s.notifHelp}
                onChange={v => onUpdateSettings({ notifHelp: v })} label="Notify me when a student flags a lesson as difficult" />
              <Toggle id="teacher-notif-weekly" checked={s.notifWeekly !== false}
                onChange={v => onUpdateSettings({ notifWeekly: v })} label="Weekly summary email of group progress" />
            </div>
          </div>
        </div>

        <div className="dojo-layout__side">
          {/* Danger zone */}
          <div className="card" style={{ border:'1px solid rgba(239,68,68,0.25)' }}>
            <h2 style={{ fontSize:'var(--fs-md)', fontWeight:'var(--fw-bold)', color:'var(--clr-error)', marginBottom:8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <Icon name="warning" size="sm" color="var(--clr-error)" /> Danger zone
            </h2>
            <p style={{ fontSize:'var(--fs-sm)', color:'var(--txt-muted)', marginBottom:16 }}>
              Deleting your account is permanent. All your groups and statistics access will be removed.
            </p>
            {!deleteConf
              ? <Button variant="danger" size="sm" onClick={() => setDeleteConf(true)} ariaLabel="Start account deletion" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Icon name="trash" size="xs" /> Delete my account
                </Button>
              : <div className="flex items-center gap-3">
                  <span style={{ fontSize:'var(--fs-sm)', color:'var(--txt-secondary)' }}>Confirm deletion?</span>
                  <Button variant="danger" size="sm" onClick={onDeleteAccount} ariaLabel="Confirm permanent deletion">Yes, delete</Button>
                  <Button variant="secondary" size="sm" onClick={() => setDeleteConf(false)} ariaLabel="Cancel">Cancel</Button>
                </div>
            }
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
